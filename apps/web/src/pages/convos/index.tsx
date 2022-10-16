import { ConvoNavigation } from "../../components/ConvoNavigation"
import { Drawer } from "ui"

function Convos() {
  return (
    <Drawer className="theme-bg-base border-r theme-border-base">
      <div className="flex overflow-hidden w-full">
        <ConvoNavigation />
      </div>
    </Drawer>
  )
}

export default Convos