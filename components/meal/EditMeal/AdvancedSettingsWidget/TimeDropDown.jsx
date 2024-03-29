import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { supabaseClient } from 'utils/supabaseClient'
import { useSession } from "@clerk/nextjs";

const timings = [
]
var current_id=0
for(var i=0;i<24;i++){
  for(var j=0;j<60;j+=15){
    current_id++
    timings.push({id:current_id,name:`${i}:${j.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`})
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TimeDropDown({meal}) {

  var defaultTiming=timings.find((timing)=> timing.name==meal.timing) || timings[0]
  const [selected, setSelected] = useState(defaultTiming)
  const { session } = useSession();
  async function handleTimingChange(e){
    setSelected(e)

    const supabase = await supabaseClient(session);
    var updateResponse=await supabase
      .from("meal")
      .update({ timing: e.name }).match({ id: meal.id, owner_id: session.user.id });


  }
  return (
    <Listbox value={selected} onChange={handleTimingChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-800">Show up at</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-light-brown" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {timings.map((timing) => (
                  <Listbox.Option
                    key={timing.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-800',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={timing}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {timing.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
