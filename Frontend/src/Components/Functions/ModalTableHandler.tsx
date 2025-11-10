export const ModalTableHandler = (
  onRowClick: (id: string, ...extras: string[]) => void,
  extraAttrs?: string[]
) => {
  return (event: React.MouseEvent<HTMLTableRowElement>) => {
    const target = event.currentTarget;
    const id = target.getAttribute("data-id") || "";
    const extras =
      extraAttrs?.map((attr) => target.getAttribute(`data-${attr}`) || "") ||
      [];
    onRowClick(id, ...extras);
  };
};
export default ModalTableHandler;
