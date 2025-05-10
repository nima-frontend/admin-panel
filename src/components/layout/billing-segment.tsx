import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BillingSegment() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  py-4 md:py-6 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You are subscribed to the Pro Plan.</p>
        <p>Next payment: June 15, 2026</p>
      </CardContent>
    </Card>
    </div>
  )
}
