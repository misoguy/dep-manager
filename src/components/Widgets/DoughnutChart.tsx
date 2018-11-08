import React from 'react'
import {Circle} from './styled'

const DoughnutChart = ({ size = 64, percent = 0 }: DoughnutChartProps) => (
  <svg width={size} viewBox="0 0 42 42">
    <circle cx="21" cy="21" r="15.91549430918954" fill="#fff" />
    <circle
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#E7E7E7"
      strokeWidth="3"
    />
    <Circle
      percent={percent}
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#111517"
      strokeWidth="3"
      strokeDasharray="0 100"
      strokeDashoffset="25"
    />
  </svg>
)

export interface DoughnutChartProps {
  size?: number
  percent?: number
}

export default React.memo(DoughnutChart)
