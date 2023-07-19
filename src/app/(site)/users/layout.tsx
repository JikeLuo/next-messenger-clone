import Sidebar from '@/app/_component/sidebar/Sidebar'
import UserList from './_component/UserList'
import getUsers from '@/actions/getUsers'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className='h-full'>
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  )
}
