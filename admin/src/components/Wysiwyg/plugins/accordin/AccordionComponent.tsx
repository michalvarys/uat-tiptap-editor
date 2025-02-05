import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { BiChevronDown } from 'react-icons/bi'


interface AccordionComponentProps {
  node: {
    attrs: {
      title: string
    }
  }
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({
  node: {
    attrs: { title },
  },
}) => {
  return (
    <NodeViewWrapper className="accordion-wrapper">
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {title}
              </Box>
              <BiChevronDown />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <NodeViewContent className="accordion-content" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </NodeViewWrapper>
  )
}
