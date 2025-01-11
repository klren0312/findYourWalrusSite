export interface OwnerObject {
  address: string
  asMoveObject: {
    contents: {
      json: SiteData
    }
  }
}

export interface SiteData {
  id: string
  name: string
}
