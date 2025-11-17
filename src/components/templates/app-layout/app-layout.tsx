import Sidebar from "../../organisms/sidebar/sidebar"

export default function AppLayout() {
  return (
    <div className="flex">
     <Sidebar/>
     <main className="flex-1 bg-amber-600">
       tu beda notatki
     </main>
    </div>
  )
}
