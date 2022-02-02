export type OwnerType = 'user' | 'team'

export type Owner = {
  id: string
  name: string
  email: string
  type: OwnerType
}
