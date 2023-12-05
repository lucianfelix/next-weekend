export async function getAdventures() {

    const data = await fetchAdventureData();
    const adventures = extractAndConvertOaiCFArray(data);
    // console.log("getAdventures", adventures);
    return adventures;
}

export function oaiGetAdventureByPath(path) {
    // replace / with _ in path
    path = path.replace(/\//g, "_");

    // console.log("oaiGetAdventureByPath", path)
    const endpoint = `http://localhost:8080/aem-sites-test4/wknd/prod/cf/fragments/${path}`;
    return fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            return extractOaiCF(data);
        });
}

function fetchAdventureData() {
    const endpoint = "http://localhost:8080/aem-sites-test4/wknd/prod/cf/fragments?filter=difficulty=Beginner";
    return fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            // console.log("data", data);
            return data._embedded.contentFragmentDtoList;
        });
}

function convertFieldsToObject(fieldsArray) {
    const fieldsObject = {};
    fieldsArray.forEach(field => {
        if (field.name && field.values) {
            // If it's not multiple, just take the first value.
            fieldsObject[field.name] = field.multiple ? field.values : field.values[0];
        }
    });
    return fieldsObject;
}

function extractOaiCF(oaiCF) {
    // console.log("Converting: ", oaiCF);
    const adventureWithFields = {
        ...convertFieldsToObject(oaiCF.fields)
    };

    adventureWithFields._path = oaiCF.path;
    adventureWithFields.title = oaiCF.title

    // console.log("adventureWithFields", adventureWithFields);

    // Add a primaryImage object to the adventure
    const imageRef = adventureWithFields.primaryImage;
    if (adventureWithFields) {
        adventureWithFields.primaryImage = {
            width: imageRef["tiff:ImageWidth"],
            height: imageRef["tiff:ImageHeight"],
            assetId: imageRef.assetId,
            _dynamicUrl: imageRef.path,
            url: imageRef.path,
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
