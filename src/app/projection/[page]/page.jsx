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
        <main>
            {fragment.data.Page.sections.map((section, index) => (
                <div key={index}>
                    {section.blocks.map((block, index) => (
                        <div key={index}>
                            {block.__typename === 'TextBlock' && (
                                <p>{block.content}</p>
                            )}
                            {block.__typename === 'CardsBlock' && (
                                <div>
                                    {block.cards.map((card, index) => (
                                        <div key={index}>
                                            <h2>{card.title}</h2>
                                            <p>{card.content}</p>
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
