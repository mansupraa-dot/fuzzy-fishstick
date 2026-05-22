export const COLLECTIONS = [
  {
    id: 1,
    slug: 'skandinavsky',
    title: 'Скандинавский интерьер',
    description:
      'Светлые тона, натуральные материалы, функциональность без лишнего. Диваны, люстры и смесители подобраны как единая история.',
    productIds: [1, 5, 6, 8, 12, 16, 18],
  },
  {
    id: 2,
    slug: 'minimalizm',
    title: 'Минимализм',
    description:
      'Только нужное. Чистые формы, нейтральная палитра, материалы с характером.',
    productIds: [3, 4, 7, 9, 13, 15],
  },
  {
    id: 3,
    slug: 'japandi',
    title: 'Japandi',
    description:
      'Японская сдержанность и скандинавский уют. Дерево, лён, матовые поверхности.',
    productIds: [2, 6, 10, 11, 17, 19],
  },
]

export function getCollectionBySlug(slug) {
  return COLLECTIONS.find((c) => c.slug === slug)
}
