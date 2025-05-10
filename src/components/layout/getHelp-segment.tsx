import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink,Github } from 'lucide-react';
import Link from "next/link";
export default function GetHelpSegment() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  py-4 md:py-6 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-xl">Need some more Help?</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-2">
          <p>I've provided some information in the readme file</p>
          <Link href="https://github.com/nima-frontend/admin-panel">
          <ExternalLink height={18} width={18} /></Link>
        </CardContent>
        <CardFooter className="mx-auto">Feel free to check my github page 
          <Link href="https://github.com/nima-frontend">
          <Github height={18} width={18} />
          </Link>
           </CardFooter>
      </Card>
    </div>
  )
}
