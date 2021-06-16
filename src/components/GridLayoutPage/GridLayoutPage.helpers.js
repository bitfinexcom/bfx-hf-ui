export const layoutDefToGridLayout = layoutDef => layoutDef.layout.map(l => ({
  i: l.i,
  x: l.x,
  y: l.y,
  w: l.w,
  h: l.h,
}))

export const gridLayoutToLayoutDef = (layoutDef, parentLayoutDef) => {
  parentLayoutDef.layout.forEach((l) => {
    const elm = layoutDef.layout.find(lElm => lElm.i === l.i)

    if (elm) {
      elm.c = l.c
    }
  })

  return layoutDef
}
