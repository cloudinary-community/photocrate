import Container from "@/components/Container"
import CopyButton from "@/components/CopyButton"

export default async function Home() {
  return (
    <main className="py-12">
      <Container className="max-w-6xl">
        <div className="prose mx-auto">
          <h1>
            Getting Started
          </h1>
          
          <p>
            Getting started with Photobox is <span className="italic">really</span> simple.
          </p>
          
          <p>
            Either clone the project locally or deploy the project, then configure your
            environment variables to connect your Cloudinary account, and you're all set!
          </p>
          
          <p>
            Let's take it step by step...
          </p>

          <p className="border border-[#FE5F2E] bg-[#FBF1E6] rounded px-4 py-3">
            <span className="opacity-95 m-0">
              A <a className="font-normal" href="https://cloudinary.com/users/register_free?utm_campaign=devx_photobox&utm_medium=referral&utm_source=photobox.dev">free Cloudinary account</a> is
              required to set up a new Photobox!
            </span>
          </p>
          
          <h2>Step 1: Clone or Deploy a New Photobox</h2>

          <h3 className="text-lg">If setting up your project locally...</h3>

          <p>
            In your terminal, run the following command:
          </p>

          <div className="grid grid-cols-[1fr_auto] gap-3 my-6">
            <pre className="m-0"><code>{'npx create-next-app@latest -e https://github.com/cloudinary-community/photobox photobox'}</code></pre>
            <CopyButton
              className="inline-flex h-12"
              text="npx create-next-app@latest -e https://github.com/cloudinary-community/photobox photobox"
            />
          </div>

          <p>
            The Photobox project will be cloned locally, dependencies installed, and your
            Git history will be reset to a new project.
          </p>

          <p className="italic text-zinc-600">
            Note: You can alternatively clone the project manually <a className="font-normal" href="https://github.com/cloudinary-community/photobox">directly from GitHub</a>.
          </p>

          <h3 className="text-lg">Or if you're deploying your project...</h3>

          <p>Deploy to Vercel:</p>
          
          <p>
            <a className="inline-block" href="https://vercel.com/new/clone?demo-description=Photo%20library%20and%20interactive%20editor%20built%20with%20Next.js&demo-image=https%3A%2F%2Fres.cloudinary.com%2Fphotoboxdev%2Fimage%2Fupload%2Ff_auto%2Fq_auto%2Fassets%2Fvercel-deploy-photobox-media-library_yclazk&demo-title=Photobox&demo-url=https%3A%2F%2Fdemo.photobox.dev%2F&project-name=Photobox&repository-name=photobox&repository-url=https%3A%2F%2Fgithub.com%2Fcloudinary-community%2Fphotobox&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,NEXT_PUBLIC_CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET&envDescription=Cloudinary%20credentials%20needed%20to%20connect%20Photobox%20to%20your%20account.&envLink=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1SIp9VL5TMo">
              <img className="m-0" width="103" height="32" src="https://vercel.com/button" alt="Deploy to Vercel" />
            </a>
          </p>

          <h2>Step 2: Configure Environment Variables</h2>

          <p>
            Photobox requires 3 environment variables to be configured, whether setting up
            locally or into a deployed environment:
          </p>

          <div className="grid gap-3 my-6">
            <pre className="m-0"><code>{`
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
            `.trim()}</code></pre>
            <CopyButton
              className="inline-flex h-12 w-24"
              text={`
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
              `.trim()}
            />
          </div>

          <p>
            These values <a className="font-normal" href="https://www.youtube.com/watch?v=1SIp9VL5TMo" target="_blank">can be found inside</a> of
            your Cloudinary dashboard.
          </p>

          <h2>Step 3: Start Your Project</h2>

          <p className="italic text-zinc-600">
            Note: Only relevant if starting your project locally!
          </p>

          <p>
            Navigate to your Photobox project directory in your terminal and run the following command:
          </p>

          <div className="grid grid-cols-[1fr_auto] gap-3 my-6">
            <pre className="m-0"><code>{'npm run dev'}</code></pre>
            <CopyButton
              className="inline-flex h-12"
              text="npm run dev"
            />
          </div>

          And once your project is started, you should now see your new Photobox project!



        </div>
      </Container>
    </main>
  )
}