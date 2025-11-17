interface Tag{
 id: string
 title: string
}

interface Props{
 tags?: Tag
}

export default function Sidebar({tags}: Props) {
  return (
    <aside className="w-[279px]">
     <div>Notatki</div>
     {tags ? <ul></ul> : null}
    </aside>
  )
}
