module Sablon  
  class OperatorCondition < Sablon::Statement::Condition
      def eval_conditional_blocks(env)
        #
        # evaluate each expression until a true one is found, false blocks
        # are cleared from the document.
        until @conditions.empty?
          condition = @conditions.shift
          conditon_expr = condition[:condition_expr]
          predicate = condition[:predicate]
          block = condition[:block]
          #
          # determine valeu of conditional expression + predicate
          value = eval_condition_expr(conditon_expr, predicate, env.context)
          #
          # manipulate block based on truthy-ness of value
          if truthy?(value)
            block.replace(block.process(env).reverse)
            break true
          else
            block.replace([])
          end
        end
      end

      def eval_condition_expr(conditon_expr, predicate, context)
        value = conditon_expr.evaluate(context)
        #
        if predicate.to_s =~ /^[!=]=/
          operator = predicate[0..1]
          cmpr_val = predicate[2..-1].tr("'", '')
          compare_values(value.to_s, cmpr_val, operator)
        elsif predicate
          value.public_send(predicate)
        else
          value
        end
      end

      def compare_values(value_a, value_b, operator)
        case operator
        when '!='
          value_a != value_b
        when '=='
          value_a == value_b
        end
      end
  end

  # Handles conditional blocks in the template that use an operator
  class OperatorConditionalHandler < Sablon::Processor::Document::ConditionalHandler
    def build_statement(constructor, field, _options = {})
      expr_name = field.expression.match(@pattern).to_a[1]
      args = [
        # end expression (first arg)
        "#{expr_name}:endIf",
        # sub block patterns to check for
        /(#{expr_name}):els[iI]f(?:\(([^)]+)\))?/,
        /(#{expr_name}):else/
      ]
      blocks = process_blocks(constructor.consume_multi_block(*args))
      OperatorCondition.new(blocks)
    end
  end

  Sablon::Processor::Document.replace_field_handler :conditional, OperatorConditionalHandler.new
end