export async function getAdventures() {

    const data = await fetchAdventureData();
    const adventures = extractAndConvertAdventures(data);
    console.log("getAdventures", adventures);
    return adventures;
}

function fetchAdventureData() {
    const endpoint = "https://dev.wknd.site/adobe/sites/cf/fragments/9f254d74-90c0-47a1-b6f4-cc38d86f2739?references=all-hydrated";
    return fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            return data;
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

// Function to extract and convert adventures
function extractAndConvertAdventures(data) {
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

                        console.log("adventureWithFields", adventureWithFields);
                        adventures.push(adventureWithFields);
                    }
                });
            }
        });
    }
    return adventures;
}
