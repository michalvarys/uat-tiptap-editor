// BoxComponent.tsx
import React, { useState } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { mergeAttributes, Node, NodeViewProps } from "@tiptap/core";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Flex,
    Grid,
    NumberInput,
    Select,
    Option,
    Switch,
    TextInput,
    Tabs,
    Tab,
    TabGroup,
    TabPanel,
    TabPanels,
} from "@strapi/design-system"
import { BoxAttributes } from './BoxExtension'
import { IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { FaCogs } from 'react-icons/fa';
import { GrMoreVertical } from 'react-icons/gr';
import { colors } from '@ssupat/components'

const ColorOption = ({ color, label, value }: { color: string, label: string, value: string }) => {
    // Získání skutečné barvy pro náhled
    const getColorValue = (colorKey: string) => {
        if (!colorKey) return undefined;
        if (colors[colorKey]) return colors[colorKey];
        const [group, shade] = colorKey.split('.');
        return colors[group]?.[shade];
    };

    const colorValue = getColorValue(value);

    return (
        <Option value={value}>
            <Flex alignItems="center" gap={2}>
                <Box
                    style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        backgroundColor: colorValue,
                        border: '1px solid rgba(0,0,0,0.1)',
                    }}
                />
                {label}
            </Flex>
        </Option>
    );
};

const ResponsiveTab = ({
    attributes,
    onChange,
    breakpoint
}: {
    attributes: Partial<BoxAttributes>,
    onChange: (attrs: Partial<BoxAttributes>) => void,
    breakpoint: string
}) => {
    const getColorOptions = () => (
        <>
            <Option value="">None</Option>

            {/* Base Colors */}
            <Option value="none" disabled>── Base Colors ──</Option>
            {['transparent', 'current', 'black', 'white'].map(color => (
                <ColorOption
                    key={color}
                    value={color}
                    label={color}
                    color={colors[color]}
                />
            ))}

            {/* Brand Colors */}
            <Option value="none" disabled>── Brand Colors ──</Option>
            {['uat_dark', 'uat_light', 'uat_green', 'uat_orange'].map(color => (
                <ColorOption
                    key={color}
                    value={color}
                    label={color}
                    color={colors[color]}
                />
            ))}

            {/* Alpha Colors */}
            {['whiteAlpha', 'blackAlpha'].map(colorGroup => (
                <React.Fragment key={colorGroup}>
                    <Option value="none" disabled>{`── ${colorGroup} ──`}</Option>
                    {Object.keys(colors[colorGroup]).map(shade => (
                        <ColorOption
                            key={`${colorGroup}.${shade}`}
                            value={`${colorGroup}.${shade}`}
                            label={`${colorGroup} ${shade}`}
                            color={colors[colorGroup][shade]}
                        />
                    ))}
                </React.Fragment>
            ))}

            {/* Primary Colors */}
            {['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'].map(colorGroup => (
                <React.Fragment key={colorGroup}>
                    <Option value="none" disabled>{`── ${colorGroup} ──`}</Option>
                    {Object.keys(colors[colorGroup]).map(shade => (
                        <ColorOption
                            key={`${colorGroup}.${shade}`}
                            value={`${colorGroup}.${shade}`}
                            label={`${colorGroup} ${shade}`}
                            color={colors[colorGroup][shade]}
                        />
                    ))}
                </React.Fragment>
            ))}

            {/* Social Colors */}
            {['linkedin', 'facebook', 'messenger', 'whatsapp', 'twitter', 'telegram'].map(colorGroup => (
                <React.Fragment key={colorGroup}>
                    <Option value="none" disabled>{`── ${colorGroup} ──`}</Option>
                    {Object.keys(colors[colorGroup]).map(shade => (
                        <ColorOption
                            key={`${colorGroup}.${shade}`}
                            value={`${colorGroup}.${shade}`}
                            label={`${colorGroup} ${shade}`}
                            color={colors[colorGroup][shade]}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    );

    return (
        <Box padding={4}>
            <Grid gap={4} gridCols={2}>
                <Select
                    label="Background"
                    value={attributes.bg || ''}
                    onChange={value => onChange({ ...attributes, bg: value })}
                >
                    {getColorOptions()}
                </Select>

                <Select
                    label="Color"
                    value={attributes.color || ''}
                    onChange={value => onChange({ ...attributes, color: value })}
                >
                    {getColorOptions()}
                </Select>

                <NumberInput
                    label="Border Radius"
                    name="borderRadius"
                    value={attributes.borderRadius as number || 0}
                    onValueChange={value => onChange({ ...attributes, borderRadius: value })}
                />
                <NumberInput
                    label="Padding"
                    name="padding"
                    value={attributes.padding as number || 0}
                    onValueChange={value => onChange({ ...attributes, padding: value })}
                />
                <NumberInput
                    label="Margin"
                    name="margin"
                    value={attributes.margin as number || 0}
                    onValueChange={value => onChange({ ...attributes, margin: value })}
                />
                <TextInput
                    label="Width"
                    name="width"
                    value={attributes.width || ''}
                    onChange={e => onChange({ ...attributes, width: e.target.value })}
                />
                <TextInput
                    label="Height"
                    name="height"
                    value={attributes.height || ''}
                    onChange={e => onChange({ ...attributes, height: e.target.value })}
                />
                {attributes.isFlex && (
                    <>
                        <Select
                            label="Flex Direction"
                            value={attributes.flexDirection}
                            onChange={value => onChange({ ...attributes, flexDirection: value })}
                        >
                            <Option value="row">Row</Option>
                            <Option value="column">Column</Option>
                        </Select>
                        <Select
                            label="Align Items"
                            value={attributes.alignItems}
                            onChange={value => onChange({ ...attributes, alignItems: value })}
                        >
                            <Option value="flex-start">Start</Option>
                            <Option value="center">Center</Option>
                            <Option value="flex-end">End</Option>
                            <Option value="stretch">Stretch</Option>
                        </Select>
                        <Select
                            label="Justify Content"
                            value={attributes.justifyContent}
                            onChange={value => onChange({ ...attributes, justifyContent: value })}
                        >
                            <Option value="flex-start">Start</Option>
                            <Option value="center">Center</Option>
                            <Option value="flex-end">End</Option>
                            <Option value="space-between">Space Between</Option>
                            <Option value="space-around">Space Around</Option>
                        </Select>
                        <NumberInput
                            label="Gap"
                            name="gap"
                            value={attributes.gap as number || 0}
                            onValueChange={value => onChange({ ...attributes, gap: value })}
                        />
                    </>
                )}
            </Grid>
        </Box>
    )
}

type BoxProps = NodeViewProps & {
    node: {
        attrs: BoxAttributes
    }
    updateAttributes: (attrs: Partial<BoxAttributes>) => void
}

export const BoxComponent: React.FC<BoxProps> = ({ node: { attrs }, updateAttributes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentAttrs, setCurrentAttrs] = useState<BoxAttributes>(attrs)

    const handleSave = () => {
        updateAttributes(currentAttrs)
        setIsModalOpen(false)
    }

    const getStyles = (attributes: BoxAttributes) => ({
        color: attributes.color,
        backgroundColor: attributes.bg,
        padding: attributes.padding,
        margin: attributes.margin,
        width: attributes.width,
        height: attributes.height,
        display: attributes.isFlex ? 'flex' : 'block',
        flexDirection: attributes.flexDirection,
        alignItems: attributes.alignItems,
        justifyContent: attributes.justifyContent,
        gap: attributes.gap,
        borderRadius: attributes.borderRadius,
        border: attributes.border,
        borderColor: attributes.borderColor,
    })

    return (
        <NodeViewWrapper>
            <Box
                pos="relative"
                sx={getStyles(attrs)}
                paddingLeft={4}
                border="1px dotted gray"
            >
                <IconButton
                    pos="absolute"
                    left={0}
                    top={2}
                    icon={<GrMoreVertical />}
                    size="xs"
                    p={0}
                    colorScheme='orange'
                    variant="link"
                    aria-label="Settings"
                    onClick={() => setIsModalOpen(true)}
                />

                <NodeViewContent />
            </Box>

            <Dialog
                onClose={() => setIsModalOpen(false)}
                title="Box Settings"
                isOpen={isModalOpen}
                style={{
                    maxWidth: '800px', maxHeight: '70vh', overflow: 'auto'
                }}
            >
                <DialogBody style={{
                    maxWidth: '800px', maxHeight: '70vh', overflow: 'auto'
                }}>
                    <Flex direction="column" gap={4}>
                        <Box padding={2}>
                            <Switch
                                label="Use Flex"
                                selected={currentAttrs.isFlex}
                                onChange={() => setCurrentAttrs(prev => ({ ...prev, isFlex: !prev.isFlex }))}
                            />
                        </Box>

                        <TabGroup style={{ width: '100%' }}>
                            <Tabs style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <Tab>Default</Tab>
                                <Tab>SM</Tab>
                                <Tab>MD</Tab>
                                <Tab>LG</Tab>
                                <Tab>XL</Tab>
                            </Tabs>
                            <TabPanels>
                                <TabPanel>
                                    <ResponsiveTab
                                        attributes={currentAttrs}
                                        onChange={attrs => setCurrentAttrs(prev => ({ ...prev, ...attrs }))}
                                        breakpoint="default"
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ResponsiveTab
                                        attributes={currentAttrs.sm || {}}
                                        onChange={attrs => setCurrentAttrs(prev => ({ ...prev, sm: attrs }))}
                                        breakpoint="sm"
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ResponsiveTab
                                        attributes={currentAttrs.md || {}}
                                        onChange={attrs => setCurrentAttrs(prev => ({ ...prev, md: attrs }))}
                                        breakpoint="md"
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ResponsiveTab
                                        attributes={currentAttrs.lg || {}}
                                        onChange={attrs => setCurrentAttrs(prev => ({ ...prev, lg: attrs }))}
                                        breakpoint="lg"
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ResponsiveTab
                                        attributes={currentAttrs.xl || {}}
                                        onChange={attrs => setCurrentAttrs(prev => ({ ...prev, xl: attrs }))}
                                        breakpoint="xl"
                                    />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </Flex>
                </DialogBody>
                <DialogFooter
                    startAction={
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            variant="tertiary"
                            size="S"
                        >
                            Zrušit
                        </Button>
                    }
                    endAction={
                        <Button
                            onClick={handleSave}
                            variant="success-light"
                            size="S"
                        >
                            Uložit
                        </Button>
                    }
                />
            </Dialog>
        </NodeViewWrapper>
    )
}