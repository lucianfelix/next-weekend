
const singleAdventureUrlBase = "https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/aem-sites/wknd/gw/cf/fragments";
const allAdventuresUrl = "https://palma-dev-public.ethos14-stage-va7.ethos.adobe.net/aem-sites/wknd/gw/cf/models/L2NvbmYvd2tuZC1zaGFyZWQvc2V0dGluZ3MvZGFtL2NmbS9tb2RlbHMvYWR2ZW50dXJl/fragments";
const publishImageBase = "https://publish-p91957-e809713.adobeaemcloud.com";

export async function getAdventures() {

    const data = await fetchAdventureData();
    const adventures = extractAndConvertOaiCFArray(data);
    return adventures;
}

export function oaiGetAdventureByPath(path) {
    // replace / with _ in path
    path = path.replace(/\//g, "_");

    const endpoint = singleAdventureUrlBase + "/" + path;
    console.log("fetching and tagging with " + path + " the adventure from URL: ", endpoint)
    // measure the time it takes to fetch the adventure
    const startTime = Date.now();
    return fetch(endpoint,
        {
            next: {
                tags: [path],
                // revalidate: 0
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response =>
            response.json())
        .then(data => {
            if(!data) {
                return {};
            }
            const endTime = Date.now();
            console.log("Fetched adventure in " + (endTime - startTime) + "ms");
            return extractOaiCF(data);
        })
        .catch(error => {
            console.error('Error while reading adventure from path:' + path, error);
            return undefined;
        });
}

function fetchAdventureData() {
    const endpoint = allAdventuresUrl;
    return fetch(endpoint, {
        next: { revalidate: 10000 },
    })
        .then(response => response.json())
        .then(data => {
            if(!data) {
                return [];
            }
            return data._embedded.contentFragmentDtoList;
        })
        .catch(error => {
            console.error('Error while reading adventures from path' + endpoint, error);
            return undefined;
        });
}

function convertFieldsToObject(fieldsArray) {
    const fieldsObject = {};
    fieldsArray.forEach(field => {
        if (field.name && field.values) {
            // If the field starts with /, skip
            if(field.name.startsWith("/")) {
                return;
            }

            //console.log("field", field);
            // If it's not multiple, just take the first value.
            fieldsObject[field.name] = field.multiple ? field.values : field.values[0];
        }
    });
    return fieldsObject;
}

function extractOaiCF(oaiCF) {
    const adventureWithFields = {
        ...convertFieldsToObject(oaiCF.fields)
    };

    adventureWithFields._path = oaiCF.path;
    adventureWithFields.title = oaiCF.title
    adventureWithFields.id = oaiCF.id

    // console.log("adventureWithFields", adventureWithFields);

    // Add a primaryImage object to the adventure
    const imageRef = adventureWithFields.primaryImage;
    //console.log("description", adventureWithFields.description);
    if (adventureWithFields && imageRef) {
        adventureWithFields.primaryImage = {
            // width: imageRef["tiff:ImageWidth"],
            // height: imageRef["tiff:ImageHeight"],
            // assetId: imageRef.assetId,
            _dynamicUrl: publishImageBase + imageRef,
            url: imageRef,
        }
    } else {
        adventureWithFields.primaryImage = {
            aemUrl: "https://wknd.site/us/en/adventures/bali-surf-camp/_jcr_content/root/container/carousel/image.coreimg.60.1600.jpeg/1660323792187/adobestock-175749320.jpeg",
            url: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--b9ef1d9a-4716-4e5e-be53-2c246df97cbd/surfing_5.jpg?width=750&quality=75",
            _dynamicUrl: "https://publish-p64257-e147834-cmstg.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--b9ef1d9a-4716-4e5e-be53-2c246df97cbd/surfing_5.jpg?width=750&quality=75",
        }
    }

    // console.log("Adventure:", adventureWithFields);
    return adventureWithFields;
}

// Function to extract and convert adventures
function extractAndConvertOaiCFArray(data) {
    const adventures = [];
    if (data && Array.isArray(data)) {
        data.forEach((oaiCF) => {
            adventures.push(extractOaiCF(oaiCF));

        });
    }
    return adventures;
}


function extractAndConvertAdventures2(data) {
    const adventures = [];
    if (data.references && Array.isArray(data.references)) {
        data.references.forEach((reference) => {
            if (reference.type === "content-fragment" && reference.references) {
                reference.references.forEach((ref) => {
                    if (ref.model && ref.model.title === "Adventure") {
                        // Create a new object that contains the converted fields
                        const adventureWithFields = {
                            ...ref,
                            fields: convertFieldsToObject(ref.fields)
                        };

                        adventureWithFields._path = adventureWithFields.path;

                        //title, price, tripLength
                        adventureWithFields.title = adventureWithFields.fields.adventureTitle;
                        adventureWithFields.price = adventureWithFields.fields.adventurePrice;
                        adventureWithFields.tripLength = adventureWithFields.fields.adventureTripLength;

                        // Add a primaryImage object to the adventure
                        const imageRef = adventureWithFields.references.find((ref) => ref.type && ref.type === "asset" && ref.fieldName && ref.fieldName === "adventurePrimaryImage");
                        if (imageRef) {
                            adventureWithFields.primaryImage = {
                                width: imageRef["tiff:ImageWidth"],
                                height: imageRef["tiff:ImageHeight"],
                                assetId: imageRef.assetId,
                                _dynamicUrl: imageRef.path,
                                url: imageRef.path,
                            }
                        }

                        // console.log("adventureWithFields", adventureWithFields);
                        adventures.push(adventureWithFields);
                    }
                });
            }
        });
    }
    return adventures;
}
