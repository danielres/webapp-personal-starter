import { getPath } from "../../api/getPath"
import { Tab, Tabs } from "../ui/Tabs"

export function MenuAdmin() {
  return (
    <Tabs>
      <Tab href={getPath.admin.users.home()}>Users</Tab>
      <Tab href={getPath.admin.projects.home()}>Projects</Tab>
    </Tabs>
  )
}
