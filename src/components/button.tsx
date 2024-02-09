import { Text, Touchable, TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonProps = React.PropsWithChildren<TouchableOpacityProps>
type ButtonTextProps = React.PropsWithChildren<TouchableOpacityProps>
type ButtonIconProps = React.PropsWithChildren<TouchableOpacityProps>

function Button({ children, ...rest }: ButtonProps) {

  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

function ButtonText({ children, ...rest }: ButtonTextProps) {

  return (
    <Text
      className="text-black font-heading text-base mx-2"
      {...rest}
    >
      {children}
    </Text>
  )
}

function ButtonIcon({ children, ...rest }: ButtonIconProps) {

  return children
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button }
