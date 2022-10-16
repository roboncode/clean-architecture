import { Container, ToggleDarkModeButton, Tooltip } from "ui"
import { Link, Outlet } from "react-router-dom"

import SidebarNavigation from '../components/SidebarNavigation'
import { SlTooltip } from "@shoelace-style/shoelace/dist/react"
import { useState } from "react"

function AppLayout () {

  const [spaceName, setSpaceName] = useState('Main Office')

  return (
    <Container className="w-screen h-screen bg-base color-base">
      <div className="h-row p-2 theme-bg-base theme-color-base border-b theme-border-base">
        <div className="h-row gap-4">
          <span className="i-tabler-circles text-xl"></span>
          <span className="font-bold">{spaceName}</span>
        </div>

        <Tooltip text="Switch Space">
          <Link to="/spaces" className="btn btn-sm border theme-border-base">
            <span className="i-tabler-switch-horizontal text-xl"></span>
          </Link>
        </Tooltip>

        <div className="flex-grow"></div>
        <ToggleDarkModeButton />
      </div>
      <Container className="flex-grow">
        <div className="flex flex-grow">
          <Container className="w-full theme-bg-base theme-color-base border-r theme-border-base max-w-14">
            <SidebarNavigation className="h-full" />
          </Container>
          <Outlet />
        </div>
      </Container>
    </Container>
  )
}

export default AppLayout