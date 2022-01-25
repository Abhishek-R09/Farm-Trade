import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()
  if (status == "authenticated") {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}