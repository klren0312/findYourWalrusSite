import { SearchOutlined } from '@ant-design/icons'
import { ConnectButton } from '@mysten/dapp-kit'

export default function Header() {
  return <div className="h-full flex justify-between items-center">
    <div className="flex items-center">
      <SearchOutlined className="text-2xl" />
      <div className="text-2xl font-bold">FIND YOUR WALRUS SITE</div>
    </div>
    <ConnectButton />
  </div>
}
