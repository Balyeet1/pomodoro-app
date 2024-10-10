import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box'
import GenericDialog from '@/app/lib/components/generic/GenericDialog'
import { SettingsOptions } from '@/app/lib/utils/pomdoro';

/**
 * A generic settings menu dialog component.
 *
 * @param {string} [style] - Optional class string for styling the dialog.
 * @param {boolean} isDialogOpen - Whether the dialog is open or not.
 * @param {() => void} onClose - The function to be called when the dialog is closed.
 * @param {SettingsOptions[]} settingsOptions - The options to be rendered in the dialog.
 *
 * @returns {JSX.Element} The dialog component.
 */
export default function SettingsMenu({
    style,
    isDialogOpen,
    onClose,
    settingsOptions,
}: {
    style?: string,
    isDialogOpen: boolean,
    onClose: () => void,
    settingsOptions: SettingsOptions<number>[],
}) {

    return (
        <GenericDialog
            isOpen={isDialogOpen}
            onClose={onClose}
            title="Settings"
            className={style}
        >
            {settingsOptions.map((option) => {

                return (
                    <div className='flex items-center justify-between' key={option.label}>
                        <h5 className='mr-8 text-sm'><strong>{option.label}</strong></h5>
                        <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '7ch' } }}>
                            <TextField
                                id="outlined-number"
                                type="number"
                                size='small'
                                defaultValue={option.value}
                                onBlur={(e) => {
                                    e.preventDefault()

                                    if (e.target.value === '' || Number(e.target.value) < 1) {
                                        e.target.value = '1'
                                    } else if (Number(e.target.value) > 99) {
                                        e.target.value = '99'
                                    }

                                    option.onChange(Number(e.target.value))
                                }
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Box>
                    </div>
                )
            }
            )}

        </GenericDialog >
    )
}