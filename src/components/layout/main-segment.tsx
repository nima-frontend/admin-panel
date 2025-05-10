import AdminHeader from "../adminHeader";
import { ChartAreaInteractive } from "../chart-area-interactive";
import { DataTable } from "../data-table";
import { SectionCards } from "../section-cards";

import data from "@/app/dashboard/data.json"

export default function MainSegment() {
  return (
    <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <AdminHeader />
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  </div>
  )
}
