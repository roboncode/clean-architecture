import { NavLink } from "react-router-dom"
import { Tooltip } from "ui"

type Props = {
  className?: string
}

function SidebarNavigation({ className }: Props) {
  const logout = () => {}

  return (
    <div className={`flex flex-col gap-0 items-center pb-2 pt-0 gap-4 ${className}`}>
      <div id="mainnav" className="flex flex-col items-center gap-4 mt-2 2xl:mt-0"></div>
      <div className="2xl:hidden border-b theme-border-base w-full -mt-2"></div>

      <Tooltip text="Conversations" direction="right">
        <NavLink to="/convos" className="btn btn-icon">
          <span className="i-tabler-messages text-2xl"></span>
        </NavLink>
      </Tooltip>

      <Tooltip text="Contacts" direction="right">
        <NavLink to="/contacts" className="btn btn-icon">
          <span className="i-tabler-address-book text-2xl"></span>
        </NavLink>
      </Tooltip>

      <Tooltip text="Inboxes" direction="right">
        <NavLink to="/inboxes" className="btn btn-icon">
          <span className="i-tabler-inbox text-2xl"></span>
        </NavLink>
      </Tooltip>

      <div className="flex-grow"></div>

      <Tooltip text="Channels" direction="right">
        <NavLink to="/channels" className="btn btn-icon">
          <span className="i-tabler-api-app text-2xl"></span>
        </NavLink>
      </Tooltip>

      <Tooltip text="Users" direction="right">
        <NavLink to="/channels" className="btn btn-icon">
          <span className="i-tabler-users text-2xl"></span>
        </NavLink>
      </Tooltip>

      <Tooltip text="Logout" direction="right">
        <div className="btn btn-icon">
          <span className="i-tabler-logout text-2xl"></span>
        </div>
      </Tooltip>
    </div>
  )
}

export default SidebarNavigation