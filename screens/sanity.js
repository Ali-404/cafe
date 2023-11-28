import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
const client = createClient({
    maxRetries:100,
    projectId:'g2372zvu', 
    dataset:'production',
    useCdn:true,
    apiVersion:"v2022-03-07"
    
})
const builder = imageUrlBuilder(client) 
export const urlFor = (source) => builder.image(source)

export default client;