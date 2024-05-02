use swc_common::Span;
use swc_ecma_ast::{ComputedPropName, Expr, Ident, PrivateName, Super};

use crate::convert_ast::converter::ast_constants::{
    MEMBER_EXPRESSION_COMPUTED_FLAG, MEMBER_EXPRESSION_FLAGS_OFFSET, MEMBER_EXPRESSION_OBJECT_OFFSET,
    MEMBER_EXPRESSION_OPTIONAL_FLAG, MEMBER_EXPRESSION_PROPERTY_OFFSET,
    MEMBER_EXPRESSION_RESERVED_BYTES, TYPE_MEMBER_EXPRESSION,
};
use crate::convert_ast::converter::AstConverter;

impl<'a> AstConverter<'a> {
  pub fn store_member_expression(
    &mut self,
    span: &Span,
    is_optional: bool,
    object: &ExpressionOrSuper,
    property: MemberOrSuperProp,
    is_chained: bool,
  ) {
    let end_position = self.add_type_and_start(
      &TYPE_MEMBER_EXPRESSION,
      span,
      MEMBER_EXPRESSION_RESERVED_BYTES,
      false,
    );
    // object
    self.update_reference_position(end_position + MEMBER_EXPRESSION_OBJECT_OFFSET);
    match object {
      ExpressionOrSuper::Expression(Expr::OptChain(optional_chain_expression)) => {
        self.store_chain_expression(optional_chain_expression, is_chained);
      }
      ExpressionOrSuper::Expression(Expr::Call(call_expression)) => {
        self.convert_call_expression(call_expression, false, is_chained);
      }
      ExpressionOrSuper::Expression(Expr::Member(member_expression)) => {
        self.convert_member_expression(member_expression, false, is_chained);
      }
      ExpressionOrSuper::Expression(expression) => {
        self.convert_expression(expression);
      }
      ExpressionOrSuper::Super(super_token) => self.store_super_element(super_token),
    }
    // flags
    let mut flags = 0u32;
    if is_optional {
      flags |= MEMBER_EXPRESSION_OPTIONAL_FLAG;
    }
    if matches!(property, MemberOrSuperProp::Computed(_)) {
      flags |= MEMBER_EXPRESSION_COMPUTED_FLAG;
    }
    let flags_position = end_position + MEMBER_EXPRESSION_FLAGS_OFFSET;
    self.buffer[flags_position..flags_position + 4].copy_from_slice(&flags.to_ne_bytes());
    // property
    self.update_reference_position(end_position + MEMBER_EXPRESSION_PROPERTY_OFFSET);
    match property {
      MemberOrSuperProp::Identifier(ident) => self.convert_identifier(ident),
      MemberOrSuperProp::Computed(computed) => {
        self.convert_expression(&computed.expr);
      }
      MemberOrSuperProp::PrivateName(private_name) => self.store_private_identifier(private_name),
    }
    // end
    self.add_end(end_position, span);
  }
}

pub enum MemberOrSuperProp<'a> {
  Identifier(&'a Ident),
  PrivateName(&'a PrivateName),
  Computed(&'a ComputedPropName),
}

pub enum ExpressionOrSuper<'a> {
  Expression(&'a Expr),
  Super(&'a Super),
}
