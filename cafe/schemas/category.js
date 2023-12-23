import {defineArrayMember, defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    
    defineField({
      name: 'meal',
      title: 'Meal Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'string',
      options: {
        initialValue:"InStock",
        list: [
          { title: "In Stock (+)", value: "InStock",initialValue:"checkone", },
          { title: "Out Of Stock (-)", value: "OutOfStock" },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Meal Price',
      type: 'number',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "extras",
      type: "array",
      title: "Extras",
      validation: Rule => Rule.required(),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'extra',
          fields: [
            {type: 'string', name: 'ExtraName',validation: Rule => Rule.required(),},
            {type: 'string', name: 'SelectType',validation: Rule => Rule.required(),
              options: {
                initialValue:"checkone",
                list: [
                  { title: "Check Only One", value: "checkone",initialValue:"checkone", },
                  { title: "Check Multiple", value: "checkmulti" },
                ],
              },
            },
            {type: 'array', name: 'value', of: [
              defineArrayMember({
                type: 'object',
                name:"extras",
                validation: Rule => Rule.required(),
                fields:[
                  {type: 'string', name: 'ExtraValue'},
                  {type: 'number', name: 'AddedPrice'},
                ]
              })
            ]},
            
          ],
          validation: Rule => Rule.required(),
        })
      ]
    }),
  ],
})
