


export default function MealCompletionStatusSteps ({current, total}) {
  const steps = []
  for (let i = 0; i < total; i++) {
    steps.push({
      name: `Step ${i + 1}`,
      href: '#',
      status: i < current ? 'complete' : i === current ? 'current' : 'upcoming',
    })
  }

  console.log("steps", steps)
  console.log("current", current)

  return (
    <nav className="flex items-center justify-center	w-full " aria-label="Progress">
      <p className="text-sm font-medium">
        {steps.findIndex((step) => step.status === 'current') + 1} / {steps.length}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5  overflow-y-scroll scrollbar-hide h-4">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === 'complete' ? (
              <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                  <span className="h-full w-full rounded-full bg-indigo-200" />
                </span>
                <span className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a href={step.href} className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}