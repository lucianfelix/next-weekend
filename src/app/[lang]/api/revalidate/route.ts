import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
    // const tag = request.nextUrl.searchParams.get('tag')
    const tag = request.nextUrl.searchParams.get('tag')
    console.log('invalidating tag:', tag)
    // @ts-ignore
    revalidateTag(tag)
    return Response.json({ revalidated: true, now: Date.now() })
}
