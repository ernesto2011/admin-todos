import { auth } from '@/auth'
import { WidgetItem } from '@/components'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const sesion = await auth()
  if (!sesion) {
    redirect('/api/auth/signin')
  }
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2"> 
        <WidgetItem title='Usuario conectado S-side'>
          <div>
            {
              JSON.stringify(sesion?.user)
            }
          </div>
        </WidgetItem>
    </div> 
  )
}
