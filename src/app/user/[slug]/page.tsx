// import Image from "next/image";
// import styles from "./page.module.css";

export default async function User({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const user = await fetch(`${process.env.URL}/api/user?userId=${slug}`)
    .then(async (res) => {
      if (res.ok) {
        return await res.json()
      } else {
        console.log(res.status)
      }
    })
    .catch((err) => {
      console.log(err)
    })

  return (
    <main>
      <div>
        <h1>Hello, {user.name}</h1>
      </div>
    </main>
  )
}
