import { Popover as AnotherPopover, Portal } from "@chakra-ui/react"
import { useState } from "react"

type PopoverProps = {
    child1: React.ReactElement,
    child2: React.ReactElement
}

export function Popover({ child1, child2 }: PopoverProps) {
    const [open, setOpen] = useState(false)
    return (
        <AnotherPopover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <AnotherPopover.Trigger asChild>
                { child1 }
            </AnotherPopover.Trigger>
            <Portal>
                <AnotherPopover.Positioner>
                    <AnotherPopover.Content>
                        <AnotherPopover.Arrow />
                        <AnotherPopover.Body onClick={() => setOpen(false)}>
                            { child2 }
                        </AnotherPopover.Body>
                    </AnotherPopover.Content>
                </AnotherPopover.Positioner>
            </Portal>
        </AnotherPopover.Root>
    )
}