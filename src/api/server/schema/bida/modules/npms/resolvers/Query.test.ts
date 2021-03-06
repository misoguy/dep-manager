import { Query } from './Query'
import { analysis } from '../loaders'

jest.mock('../loaders', () => ({ analysis: { load: jest.fn() } }))

const { load } = analysis as any
const { npmPackage: resolve } = Query as any

describe('api/bida/npm/resolvers/Query/npmPackage', () => {
  it('should extract metadata', async () => {
    const name = 'name'
    const metadata = { name: 'name', version: '1.0.0' }

    load.mockReturnValueOnce(Promise.resolve({ collected: { metadata } }))

    await expect(resolve(null, { name })).resolves.toEqual(metadata)
  })
})
