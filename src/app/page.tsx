import Container from "@/components/Container"

export default async function Home() {
  return (
    <div>
      <Container className="grid grid-cols-2">
        <div>
          <h1>Photobox</h1>
          <p>Text</p>
        </div>
        <div>
          Image
        </div>
      </Container>
    </div>
  )
}