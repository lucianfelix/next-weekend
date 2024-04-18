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
    let page = params.page;

    //remove the suffix from the page
    page = page.replace(/\.md$/, '');
    page = page.replace(/\.html$/, '');

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
            <h>{fragment.data.Page.title}</h>
            {fragment.data.Page.sections.map((section, index) => (
                <div
                    key={index}>
                    {section.blocks.map((block, index) => (
                        <div
                            key={block._id}>
                            {block.__typename === 'TextBlock' && (
                                <p>{block.content}</p>
                            )}
                            {block.__typename === 'CardsBlock' && (
                                <table class="cards">
                                    <tr key={"card" + index}>
                                        <td colSpan={2}>Cards</td>
                                    </tr>
                                        {block.cards.map((card, index) => (
                                            <tr key={"card" + index}>
                                                <td>
                                                        <img loading="lazy" alt="A fast-moving Tunnel"
                                                             src="https://main--sidewalk-demo--lucianfelix.hlx.page/media_1d3cc6942b4098c8e408f3cab760f05cc489488db.jpeg#width=1180&height=787"
                                                             width="1600" height="909"/>
                                                </td>
                                                <td>
                                                    <p><strong>{card.title}</strong></p>
                                                    <p>{card.content}</p>
                                                </td>
                                            </tr>))
                                        }
                                </table>
                                )}
                        </div>
                    ))}
                </div>
            ))}
        </main>)
}
