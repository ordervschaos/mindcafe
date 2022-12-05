/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TabPills({user}) {
  const tabs = [
    { name: 'Published', href: user.id, current: !window.location.pathname.includes('draft') },
    { name: 'Drafts', href: 'drafts', current: window.location.pathname.includes('draft') },
  ]
  return (
    <div className="mb-5">
      
      <div className="">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
