import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement,Filler, Tooltip, Legend)

const userData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "New Users",
      data: [120, 190, 170, 220, 250, 300, 280],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ],
}
const incomeData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "New Incomes",
      data: [120, 190, 100, 220, 300, 240, 280],
      borderColor: "#9E0142",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

export default function AnalyticsSegment() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-2 py-4 md:py-6 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly User Growth</CardTitle>
      </CardHeader>
      <CardContent className="h-56 flex justify-center">
        <Line data={userData} options={options} />
      </CardContent>
    </Card>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Income Growth</CardTitle>
      </CardHeader>
      <CardContent className="h-56 flex justify-center">
        <Line data={incomeData} options={options} />
      </CardContent>
    </Card>
    </div>
  )
}
