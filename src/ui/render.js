require("svelte/register");

const render = ({ component, children, props }) => {
  const slot = children ? children.map(render) : null;

  const Component =
    typeof component === "string"
      ? require(`./components/${component}.svelte`).default
      : component.default;

  const { html, css } = Component.render({
    ...props,
    children: slot ? slot.reduce((acc, cur) => acc + cur.html, "") : null,
  });

  const childCss = slot
    ? slot.reduce((acc, cur) => acc + (cur.css.code || ""), "")
    : "";

  return { html, css: css.code + childCss };
};

exports.render = render;
