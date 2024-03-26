import Link from "next/link";

import Container from "@/components/Container"
import CldImage from "@/components/CldImage"
import CopyButton from "@/components/CopyButton"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <div>
      <Container className="max-w-6xl grid text-center md:text-left md:grid-cols-[3fr_4fr] gap-4 md:gap-8 md:py-12 mt-12 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black mb-5">
            Photobox
          </h1>
          <p className="text-lg mb-6">
            Image library and interactive editor built with Next.js
          </p>
          <p className="flex gap-4 mb-6">
            <Button>
              <Link href="/getting-started">Get Started</Link>
            </Button>
            <Button variant="outline">
              <a href="https://github.com/cloudinary-community/photobox">View on GitHub</a>
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
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Create a new Photobox
        </h2>
        <div className="grid sm:grid-cols-[auto_1fr] gap-2 max-w-lg mx-auto mb-6">
          <code className="flex items-center overflow-x-scroll h-12 text-sm border border-zinc-200 py-3 px-4 rounded">
            <pre>{`npx create-next-app@latest https://github.com/cloudinary-community/photobox photobox`}</pre>
          </code>
          <CopyButton
            className="inline-flex gap-2 h-12"
            text="npx create-next-app@latest https://github.com/cloudinary-community/photobox photobox"
          />
        </div>
        <p className="text-sm mb-6">
          Or deploy your new library!
        </p>
        <p>
          <a className="inline-block" href="https://vercel.com/new/clone?demo-description=Photo%20library%20and%20interactive%20editor%20built%20with%20Next.js&demo-image=https%3A%2F%2Fres.cloudinary.com%2Fphotoboxdev%2Fimage%2Fupload%2Ff_auto%2Fq_auto%2Fassets%2Fvercel-deploy-photobox-media-library_yclazk&demo-title=Photobox&demo-url=https%3A%2F%2Fdemo.photobox.dev%2F&project-name=Photobox&repository-name=photobox&repository-url=https%3A%2F%2Fgithub.com%2Fcloudinary-community%2Fphotobox&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,NEXT_PUBLIC_CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET&envDescription=Cloudinary%20credentials%20needed%20to%20connect%20Photobox%20to%20your%20account.&envLink=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1SIp9VL5TMo">
            <img width="103" height="32" src="https://vercel.com/button" alt="Deploy to Vercel" />
          </a>
        </p>
      </Container>
      <Container className="max-w-2xl text-center my-12">
        
      </Container>
    </div>
  )
}