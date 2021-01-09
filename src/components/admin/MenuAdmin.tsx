import { Tab, Tabs } from "../ui/Tabs"

export function MenuAdmin() {
  return (
    <Tabs>
      <Tab href="/admin">Users</Tab>
      <Tab href="#">Projects</Tab>
    </Tabs>
  )
}
