import { useCurrentAccount } from '@mysten/dapp-kit'
import { Button, Flex, Table } from 'antd'
import { GetOwnerObjectsApi } from '../apis/owner.api'
import { useEffect, useState } from 'react'
import { PageInfo } from '../apis/types/common.type'
import { SiteData } from '../apis/types/owner.type'
import { Link } from 'react-router-dom'
import { addressToBase36 } from '../utils/tools'

export default function HomePage() {
  const account = useCurrentAccount()
  const chain = account?.chains?.find((c) => c.startsWith('sui:'))?.replace(/^sui:/, '')
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined)
  const [ownerObjects, setOwnerObjects] = useState<SiteData[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const columns = [
    {
      title: 'Site Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Object Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Link to={`https://suiscan.xyz/${chain}/object/${text}`}>{text}</Link>,
    },
    {
      title: 'Review Page',
      key: 'action',
      render: (item: SiteData) => <Button type="link" onClick={() => {
        window.open(`https://${addressToBase36(item.id)}.walrus.site`, '_blank')
      }}>Go</Button>,
    }
  ]
  /**
   * 获取用户对象
   * @param direction 0: 上一页 1: 下一页
   */
  const getOwnerObjects = async (direction: number | null) => {
    if (!account?.address) return
    setTableLoading(true)
    let startCursor = pageInfo?.startCursor || null
    let endCursor = pageInfo?.endCursor || null
    switch (direction) {
      case 0:
        endCursor = null
        break
      case 1:
        startCursor = null
        break
      default:
        startCursor = null
        endCursor = null
        break
    }
    const result = await GetOwnerObjectsApi(account?.address, startCursor, endCursor)
    setPageInfo(result?.pageInfo)
    if (result?.nodes) {
      const siteData = result?.nodes.map((node) => {
        if (node && node.asMoveObject && node.asMoveObject.contents && node.asMoveObject.contents.json) {
          const siteData = node.asMoveObject.contents.json as unknown as SiteData
          return siteData
        }
      }).filter((item) => item !== undefined)
      setOwnerObjects(siteData)
    }
    setTableLoading(false)
  }

  useEffect(() => {
    if (account?.address) {
      getOwnerObjects(null)
    }
  }, [account?.address])

  return (
    <div className="text-3xl font-bold underline py-5 px-16">
      <Flex justify="center" gap="middle">
        <Button disabled={!pageInfo?.hasPreviousPage} type="link" onClick={() => getOwnerObjects(0)}>Prev</Button>
        <Button disabled={!pageInfo?.hasNextPage} type="link" onClick={() => getOwnerObjects(1)}>Next</Button>
      </Flex>
      <Table rowKey="id" dataSource={ownerObjects} columns={columns} pagination={false} loading={tableLoading} />
      <Flex justify="center" gap="middle">
        <Button disabled={!pageInfo?.hasPreviousPage} type="link" onClick={() => getOwnerObjects(0)}>Prev</Button>
        <Button disabled={!pageInfo?.hasNextPage} type="link" onClick={() => getOwnerObjects(1)}>Next</Button>
      </Flex>
    </div>
  )
}
