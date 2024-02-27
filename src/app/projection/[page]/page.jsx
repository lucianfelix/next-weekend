import Image from 'next/image';
import Script from 'next/script';
import {ProjectionsClient} from "../../../lib/projections";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = 'default-no-store'

export const revalidate = 1; // 12 hours in seconds

const projectionClient = ProjectionsClient.fromEnv();

export default async function Page({params}) {
    const page = params.page;

    const fragment = await projectionClient.getPageFragment(page);

    /* example fragment:

    {
  "data": {
    "Page": {
      "title": "Page 1",
      "description": "Page 1 description",
      "sections": [
        {
          "blocks": [
            {
              "__typename: "TextBlock",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
            },
            {
              "__typename: "TextBlock",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
            },
            {
              "__typename: "CardsBlock",
              "cards": [
                {
                  "title": "Cards 1 Title",
                  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
                },
                {
                  "title": "Cards 2 Title",
                  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
                }
              ]
            }
          ]
        },
        {
          "blocks": [
            {
              "__typename: "TextBlock",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
            },
            {
              "__typename: "TextBlock",
              "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
            }
          ]
        }
      ]
    }
  }
}
     */

    // render sections as <div> elements
    // render each block depending on its type in __typename

    return (
        <main
            data-aue-resource={"urn:palma:" + page}
            data-aue-label="Page"
            data-aue-type="reference"
            data-aue-filter="cf"
        >
            <Script
                strategy="lazyOnload"
                src="https://cdn.jsdelivr.net/gh/adobe/universal-editor-cors/dist/universal-editor-embedded.js"
            />

            {fragment.data.Page.sections.map((section, index) => (
                <div
                    data-aue-resource={"urn:palma:" + section._id}
                    data-aue-label={section.__typename}
                    data-aue-type="reference"
                    data-aue-filter="cf"
                    key={index}>
                    {section.blocks.map((block, index) => (
                        <div
                            data-aue-resource={"urn:palma:" + block._id}
                            data-aue-label={block.__typename}
                            data-aue-type="reference"
                            data-aue-filter="cf"
                            key={block._id}>
                            {block.__typename === 'TextBlock' && (
                                <p
                                    data-aue-prop="content"
                                    data-aue-label="content"
                                    data-aue-type="text"
                                >{block.content}</p>
                            )}
                            {block.__typename === 'CardsBlock' && (
                                <div>
                                    {block.cards.map((card, index) => (
                                        <div key={index}>
                                            <h2
                                                data-aue-prop="title"
                                                data-aue-label="title"
                                                data-aue-type="text"
                                            >{card.title}</h2>
                                            <p
                                                data-aue-prop="content"
                                                data-aue-label="content"
                                                data-aue-type="text"
                                            >{card.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </main>)
}
