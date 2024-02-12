"use client"
import { mak } from "@mak"
import {
  BiBell,
  BiBox,
  BiChevronRight,
  BiCog,
  BiDownArrowAlt,
  BiError,
  BiFolder,
  BiGlobe,
  BiLogoAws,
  BiSearch,
  BiShareAlt,
  BiUpArrowAlt,
  BiUser,
} from "react-icons/bi"
import ThemeButton from "../_components/ThemeButton"
import { useEffect, useRef, useState, memo } from "react"

const OVAIDashPage = () => {
  const [selectedTab, setSelectedTab] = useState("Overview")
  return (
    <div className="p-8 gap-8 flex flex-col overflow-hidden flex-grow">
      <HeaderWithSearch />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <AnomaliesTimeline />
      <Cards />
      <div className="h-full max-h-full min-h-0 w-full flex flex-grow gap-6">
        <Table />
        <span className="flex w-1/2 flex-shrink-0" />
        {/* <Table /> */}
      </div>
    </div>
  )
}

const HeaderWithSearch = () => {
  return (
    <div className="flex gap-6">
      <mak.span
        className="size-12 rounded-full flex-shrink-0"
        makClassName="bg-primary-500"
      />
      <span className="relative flex gap-4 w-full items-center">
        <mak.span className="absolute ml-4" makClassName="text-primary-200">
          <BiSearch className="size-5" />
        </mak.span>
        <mak.input
          className="w-full rounded-md border-2 h-12 px-10 "
          makClassName="border-theme|secondary text-primary focus:border-primary"
          // makClassName="bg-theme|secondary border-theme|tertiary text-primary"
          placeholder="Search"
        />
        <mak.span className="flex-shrink-0" makClassName="text-primary-200">
          <BiCog className="size-6" />
        </mak.span>
        <mak.span
          className="flex flex-shrink-0 rounded-full size-8"
          makClassName="bg-error"
        />
      </span>
      <span className="absolute bottom-4 right-4">
        <ThemeButton />
      </span>
    </div>
  )
}

const Tabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string
  setSelectedTab: (tab: string) => void
}) => {
  const tabOptions = ["Overview", "Anomalies", "Buckets", "Objects", "Actions"]
  return (
    <div className="flex flex-col">
      <div className="group flex gap-4">
        <>
          {tabOptions.map((tab, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-1 items-center justify-center group"
            >
              <mak.button
                makClassName={`fade-in-out selected:text-danger ${
                  tab === selectedTab
                    ? "text-color|primary-500 dark:text-color|primary-300 hover:text-color|primary-500"
                    : "text-primary-300 dark:text-primary-700 hover:text-color|primary-300"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </mak.button>

              <mak.hr
                className="absolute -bottom-3 w-[110%] mt-3"
                makClassName="border-primary"
                motion={{
                  initial: {
                    opacity: 0,
                    borderWidth: 0,
                  },
                  animate: {
                    opacity: tab === selectedTab ? 1 : 0,
                    borderWidth: 1,
                  },
                  transition: {
                    duration: 0.2,
                  },
                }}
              />
            </div>
          ))}
        </>
      </div>
      <mak.hr className="w-full border-1 mt-[11px]" />
    </div>
  )
}

const AnomaliesTimelineComponent = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [numberOfMarkers, setNumberOfMarkers] = useState<number>()
  useEffect(() => {
    const timelineElement = timelineRef.current

    const getNumberOfMarkers = () => {
      if (timelineElement) {
        const timelineWidth = timelineElement.getBoundingClientRect().width
        setNumberOfMarkers(Math.round(timelineWidth / 14))
      }
    }

    // Using ResizeObserver to watch for size changes in the timeline element
    const resizeObserver = new ResizeObserver(getNumberOfMarkers)

    if (timelineElement) {
      resizeObserver.observe(timelineElement)
    }

    // Cleanup function to unobserve the element
    return () => {
      if (timelineElement) {
        resizeObserver.unobserve(timelineElement)
      }
    }
  }, [])

  const AnomalyMarker = () => {
    const getRandomBackgroundColor = () => {
      let random = Math.random() * 100
      const options = [
        { color: "bg-success", chance: 85 },
        { color: "bg-warning", chance: 10 },
        { color: "bg-danger", chance: 5 },
      ]
      for (let option of options) {
        if (random < option.chance) {
          return option.color
        }
        random -= option.chance
      }
    }
    return (
      <mak.span
        className="h-12 w-2 rounded-full"
        makClassName={getRandomBackgroundColor()}
      />
    )
  }
  return (
    <div className="w-full h-fit" ref={timelineRef}>
      <div className="flex gap-1.5">
        {Array.from({ length: numberOfMarkers || 0 }).map((_, index) => (
          <AnomalyMarker key={index} />
        ))}
      </div>
    </div>
  )
}

const AnomaliesTimeline = memo(AnomaliesTimelineComponent)

const Card = ({
  title,
  value,
  icon,
  delta,
  bubbleColor,
}: {
  title: string
  value: string | number
  icon?: React.ReactNode
  delta?: number
  bubbleColor?: "success" | "warning" | "danger" | "neutral" | string
}) => {
  bubbleColor = bubbleColor === "neutral" ? "dark" : bubbleColor
  return (
    <mak.div
      className="flex flex-col justify-between rounded-md drop-shadow-sm flex-grow h-32 min-w-32 border-2 p-6"
      makClassName="bg-theme|primary border-theme|tertiary/50 text-primary-300"
    >
      <div className="flex w-full justify-between">
        <h2>{title}</h2>
        {icon && <span>{icon}</span>}
      </div>
      <div className="flex w-full justify-between items-end">
        <mak.div
          className="text-4xl font-semibold"
          makClassName="text-primary-500"
        >
          {value}
        </mak.div>
        {delta && (
          <mak.span
            className="px-3 py-1 rounded-full text-xs flex gap-0.5 items-center justify-center font-semibold"
            makClassName={`bg-${
              bubbleColor || "primary"
            }/25 text-${bubbleColor}-700 dark:text-${bubbleColor}-300`}
          >
            <span>
              {delta > 0 ? (
                <BiUpArrowAlt className="stroke-[1px]" />
              ) : (
                <BiDownArrowAlt className="stroke-[1px]" />
              )}
            </span>
            <p>{Math.abs(delta)}%</p>
          </mak.span>
        )}
      </div>
    </mak.div>
  )
}
const Cards = () => {
  return (
    <div className="flex gap-6 flex-wrap *:basis-1/5 pt-2">
      <Card
        title="Total Anomalies"
        value={24}
        icon={<BiError className="size-6" />}
        delta={20}
        bubbleColor="danger"
      />
      <Card
        title="Access Patterns"
        value={12}
        icon={<BiShareAlt className="size-6" />}
        delta={15}
        bubbleColor="warning"
      />
      <Card
        title="IP Addresses"
        value={7}
        icon={<BiGlobe className="size-6" />}
      />
      <Card
        title="User Authorizations"
        value={12}
        icon={<BiUser className="size-6" />}
      />
    </div>
  )
}

const Table = () => {
  const data = {
    Accounts: [
      { name: "Integrity", alerts: 3 },
      { name: "AIMS", alerts: 7 },
      { name: "STEVE", alerts: 2 },
    ],
    Buckets: [
      { name: "leo-input-aimsplatform", alerts: 2 },
      { name: "aims-partners3", alerts: 1 },
      { name: "nwhinprod", alerts: 6 },
    ],
    Prefixes: [
      { name: "ee8702fe15f63cad54457b47", alerts: 5 },
      { name: "1.2.840.114350.1.13.105.2.7...", alerts: 1 },
      { name: "AIDAUMG6XAMHZXVH4ERUD", alerts: 2 },
    ],
  }
  const [tableConfig, setTableConfig] = useState(
    Object.keys(data).map((key) => ({ key, expanded: true }))
  )

  const totalAlerts = (data: {
    [key: string]: { name: string; alerts: number }[]
  }) => {
    return Object.values(data).reduce(
      (acc, curr) => acc + curr.reduce((acc, curr) => acc + curr.alerts, 0),
      0
    )
  }

  return (
    <div className="flex flex-col gap-2 flex-grow w-full h-fit">
      <mak.span
        className="flex gap-2 items-center mx-4 text-lg font-semibold justify-between"
        makClassName="text-primary"
      >
        <span className="flex gap-2 items-center">
          <BiBell />
          <p>Alert Summary</p>
        </span>
        {totalAlerts(data)}
      </mak.span>
      <mak.div
        className="h-full w-full drop-shadow-xl rounded-xl border-2 overflow-hidden"
        makClassName="bg-theme|primary border-theme|tertiary/50 border-theme|tertiary/50 text-primary"
      >
        {Object.entries(data).map(([title, rows], index) => {
          const rowExpanded = tableConfig[index].expanded
          const dotColor = (index: number) => {
            if (index === 0 || index % 4 === 0) return "bg-primary-300"
            if (index === 1 || index % 4 === 1) return "bg-secondary-300"
            if (index === 2 || index % 4 === 2) return "bg-tertiary-300"
            return "bg-primary-300"
          }
          return (
            <mak.div key={index} className="flex flex-col gap-4">
              <mak.table className="w-full" makClassName="text-primary-400">
                <mak.thead
                  makClassName={
                    rowExpanded ? `bg-light-50 dark:bg-dark-800` : ""
                  }
                  className="fade-in-out cursor-pointer"
                  onClick={() => {
                    const newTableConfig = [...tableConfig]
                    newTableConfig[index].expanded =
                      !newTableConfig[index].expanded
                    setTableConfig(newTableConfig)
                  }}
                >
                  <tr className="*:px-4 *:py-3 *:font-normal">
                    <th
                      colSpan={1}
                      className="flex items-center gap-2 text-left"
                    >
                      <mak.span
                        motion={{
                          initial: {
                            rotate: 0,
                          },
                          animate: {
                            rotate: tableConfig[index].expanded ? 90 : 0,
                          },
                          transition: { duration: 0.2 },
                        }}
                      >
                        <BiChevronRight className="size-6" />
                      </mak.span>
                      {index === 0 && <BiLogoAws className="size-6" />}
                      {index === 1 && <BiBox className="size-4" />}
                      {index === 2 && <BiFolder className="size-4" />}
                      {title}
                    </th>
                    <th colSpan={1} className="text-right ">
                      {totalAlerts({ [title]: rows })}
                    </th>
                  </tr>
                </mak.thead>
                <tbody>
                  <mak.td colSpan={2} className="w-full">
                    <mak.div
                      className="overflow-hidden w-full "
                      motion={{
                        initial: {
                          height: 0,
                        },
                        animate: {
                          height: rowExpanded ? "auto" : "0px",
                        },
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      {rows.map((row, rowIndex) => (
                        <span key={rowIndex} className="w-full text-sm">
                          <td className="text-start w-full pl-12 py-2">
                            <span className="flex gap-2 items-center">
                              <mak.span
                                className="rounded-full size-2 flex"
                                makClassName={dotColor(rowIndex)}
                              />
                              <p>{row.name}</p>
                            </span>
                          </td>
                          <td colSpan={1} className="text-end w-full pr-4">
                            {row.alerts}
                          </td>
                        </span>
                      ))}
                    </mak.div>
                    <mak.hr
                      className="absolute w-full border-1"
                      makClassName="border-theme|tertiary/50"
                    />
                  </mak.td>
                </tbody>
              </mak.table>
            </mak.div>
          )
        })}
      </mak.div>
    </div>
  )
}
export default OVAIDashPage
