import {defineField, defineType, validation} from 'sanity'

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
  ],
})
