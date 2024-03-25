import Container from "@/components/Container"

export default async function Home() {
  return (
    <main className="py-12">
      <Container className="max-w-6xl">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-black mb-5">
            Getting Started
          </h1>
          <p className="mb-6">
            Text
          </p>
        </div>
      </Container>
    </main>
  )
}