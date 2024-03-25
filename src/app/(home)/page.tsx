import Link from "next/link";

import Container from "@/components/Container"
import CldImage from "@/components/CldImage"
import CopyButton from "@/components/CopyButton"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <div>
      <Container className="max-w-6xl grid text-center md:text-left md:grid-cols-[3fr_4fr] gap-4 md:gap-8 md:py-12 my-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            Photobox
          </h1>
          <p className="mb-6">
            Text
          </p>
          <p className="mb-6">
            <Button>
              <Link href="/getting-started">Get Started</Link>
            </Button>
          </p>
        </div>
        <div>
          <CldImage
            className="shadow-lg rounded-lg"
            width="1723"
            height="978"
            src="assets/photobox-media-library_qsqtf0"
            alt="Photobox media library"
            sizes="50w"
          />
        </div>
      </Container>
      <Container className="max-w-2xl text-center my-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Create a new Photobox
        </h2>
        <div className="grid sm:grid-cols-[auto_1fr] gap-2 max-w-lg mx-auto">
          <code className="flex items-center overflow-x-scroll h-12 text-sm border border-zinc-200 py-3 px-4 rounded">
            <pre>{`npx create-next-app@latest https://github.com/cloudinary-community/photobox photobox`}</pre>
          </code>
          <CopyButton
            className="inline-flex gap-2 h-12"
            text="npx create-next-app@latest https://github.com/cloudinary-community/photobox photobox"
          />
        </div>
      </Container>
    </div>
  )
}