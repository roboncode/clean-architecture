import { NavLink } from "react-router-dom"

export const ConvoNavigation = () => {
  return (
    <div className="pb-12">
      <div className="sticky top-0 z-1 theme-bg-base border-b theme-border-base">
      <div className="p-2">
        <NavLink to="/convos/new" className="btn btn-sm btn-primary w-full py-2">
          <span className="i-tabler-plus text-lg"></span>
          <span>New Conversation</span>
        </NavLink>
      </div>
      </div>
    </div>
  )
}