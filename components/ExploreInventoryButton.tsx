import { Button } from "@mui/material"
import Link from "next/link"

const ExploreInventoryButton = ({sx} : any) => {

    return (
      <Link href="/cars">
        <Button variant="contained" sx={{...sx}}>
          Explore Inventory
        </Button>
      </Link>
    )
  }

export default ExploreInventoryButton