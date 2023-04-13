


export default function MealCompletionStatusSteps({ completed, total }) {
  var percentage = ((completed+1) / total) * 100
  if(percentage>100)
    percentage = 100
  percentage = percentage + '%'
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: percentage }}></div>
    </div>
  )
}